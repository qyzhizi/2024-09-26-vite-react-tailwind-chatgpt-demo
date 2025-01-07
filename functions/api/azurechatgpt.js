export async function onRequestPost(context) {
    const { request, env } = context;

    try {
        // const text = await request.text(); // Correctly read request body
        // Check if the content type is JSON
        const contentType = request.headers.get("content-type");
        let messages = null;
        if (contentType?.includes("application/json")) {
            // Parse the JSON body
            const body = await request.json();
            messages = body.messages;
        } else {
            return new Response('Unsupported Content-Type', { status: 400 });
        }
        
        const requestData = { messages: messages };

        const azure_openai_key = env.AZURE_OPENAI_API_KEY;
        const azure_openai_url = env.AZURE_OPENAI_URL;

        const requestOptions = {
            method: 'POST',
            headers: {
                'api-key': `${azure_openai_key}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
            // body: requestData,
        };
        const chatres = await fetch(azure_openai_url, requestOptions);
        
        if (!chatres.ok) {
            // Handle non-200 responses
            return new Response(JSON.stringify({ error: "Failed to fetch from OpenAI" }), { status: chatres.status });
        }

        // console.log(chatres)
        const responseData = await chatres.json();
        // console.log(responseData)
        return new Response(JSON.stringify(responseData), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        // Catch any errors and return a 500 response
        return new Response(JSON.stringify({ error: "Internal Server Error", details: error.message }), { status: 500 });
    }
}
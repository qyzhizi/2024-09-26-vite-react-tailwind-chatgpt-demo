export async function onRequestPost(context) {
    const { request, env } = context;

    try {
        // const text = await request.text(); // Correctly read request body
        // Check if the content type is JSON
        const contentType = request.headers.get("content-type");
        let text;
        if (contentType && contentType.includes("application/json")) {
            // Parse the JSON body
            const body = await request.json();
            text = body.text; // Access the 'text' field
        }else {
            return new Response('Unsupported Content-Type', { status: 400 });
        }

        const requestData = {
            messages: [{ role: 'user', content: text }],
            // messages: [{ role: 'user', content: 'hello' }],
        };

        const azure_openai_key = env.AZURE_OPENAI_API_KEY;
        const azure_openai_endpoint = env.AZURE_OPENAI_ENDPOINT
        const requestOptions = {
            method: 'POST',
            headers: {
                'api-key': `${azure_openai_key}`,
                "Content-Type": "application/json",
                "User-Agent":"PostmanRuntime/7.40.0"
            },
            body: JSON.stringify(requestData),
            // body: requestData,
        };
        const url = azure_openai_endpoint + '/openai/deployments/gpt-35-turbo/chat/completions?api-version=2024-02-01'
        const chatres = await fetch(url, requestOptions);
        
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
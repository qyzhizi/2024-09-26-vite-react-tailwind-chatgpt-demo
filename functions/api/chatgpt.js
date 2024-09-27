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
        const openai_key = env.OpenAIKey;

        const requestData = {
            model: 'gpt-3.5-turbo',
            // model: 'gpt-4o-2024-05-13',
            messages: [{ role: 'user', content: text }],
            // messages: [{ role: 'user', content: 'hello' }],
            temperature: 0.73
        };

        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': `${openai_key}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        };

        const chatres = await fetch('https://burn.hair/v1/chat/completions', requestOptions);
        
        if (!chatres.ok) {
            // Handle non-200 responses
            return new Response(JSON.stringify({ error: "Failed to fetch from OpenAI" }), { status: chatres.status });
        }

        // console.log(chatres)
        const responseData = await chatres.json();
        // chatres.log(responseData)
        return new Response(JSON.stringify(responseData), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        // Catch any errors and return a 500 response
        return new Response(JSON.stringify({ error: "Internal Server Error", details: error.message }), { status: 500 });
    }
}
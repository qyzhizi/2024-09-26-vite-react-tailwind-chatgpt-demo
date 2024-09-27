export async function onRequestPost(context) {
    const { request, env } = context;

    try {
        const text = await request.text(); // Correctly read request body
        const openai_key = env.OpenAIKey;

        const requestData = {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: text }],
        };

        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${openai_key}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        };

        const chatres = await fetch('https://burn.hair/v1/chat/completions', requestOptions);
        
        if (!chatres.ok) {
            // Handle non-200 responses
            return new Response(JSON.stringify({ error: "Failed to fetch from OpenAI" }), { status: chatres.status });
        }

        const responseData = await chatres.json();
        return new Response(JSON.stringify(responseData), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        // Catch any errors and return a 500 response
        return new Response(JSON.stringify({ error: "Internal Server Error", details: error.message }), { status: 500 });
    }
}
export async function onRequestPost(context) {
    const { request, env } = context;
    
    const text = request.text;
    const openai_key = env.OpenAIKey
    // const input = "你的输入内容"; // 替换为实际输入内容

    const requestData = {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: text }],
    };
    
    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${openai_key}`, // 使用模板字面量插入变量
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
    };
    
    fetch('https://burn.hair/v1/chat/completions', requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return Response.json(response.json()); // 解析 JSON 响应
        })
        .catch(error => {
            // 处理错误
            return new Response(error.message, { status: 500 });
        });
}
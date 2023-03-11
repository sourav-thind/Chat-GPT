import openai from './chatgpt'

const query = async(prompt: string, chatId: string, model: string) => {
  const res = await openai
    .createCompletion({
      model,
      prompt,
      temperature: 0.9,
      max_tokens: 100,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    .then(res => console.log(res.data.choices[0].text))
    .catch(
      err =>
         `The OpenAI API is down, See you soon`
        
    )


  return res
}

export default query

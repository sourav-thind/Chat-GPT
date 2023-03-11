'use client'
import useSWR from 'swr';
import Select from 'react-select';

const  fetchModels = async()=> await fetch('/api/getEngine').then((res)=> res.json)

const ModelSelection = () => {
    const {data: models, isLoading} = useSWR("models", fetchModels);
    const {data: model , mutate : setModel} = useSWR("model" , 
    {
        fallbackData: 'text-davinci-003'
    })
  return (
    <div>
      <Select
      className='mt-2'
      //options={models?.modelOption}
      defaultValue={model}
      placeholder={model}
      isLoading={isLoading}
      menuPosition='fixed' 
      classNames={{
        control: (state)=>"bg-[434654] border-[434654], text-white"
      }}
      onChange={ (e)=>setModel(e.value)}
      />
    </div>
  )
}

export default ModelSelection

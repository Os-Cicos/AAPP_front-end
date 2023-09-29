import Textfield from "@/elements/components/textfileld_c03";

export default function Home() {
  return (
    <main>
      <Textfield
        label={'Insira sua pergunta'}
        placeholder={'Digite aqui...'}
        id={'TextField'} type={'text'} />
    </main>
  )
}

import Switch from "@/elements/components/switch_c04";
import Textfield from "@/elements/components/textfileld_c03";

export default function Home() {
  return (
    <main>
      <Textfield
        label={'Insira sua pergunta'}
        placeholder={'Digite aqui...'}
        id={'TextField'} type={'text'} />
      <Switch/>
    </main>
  )
}

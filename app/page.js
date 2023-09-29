import Button from "@/elements/components/button_c05";
import Switch from "@/elements/components/switch_c04";
import Textfield from "@/elements/components/textfileld_c03";

export default function Home() {
  return (
    <main style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
      <Textfield
        label={'Insira sua pergunta'}
        placeholder={'Digite aqui...'}
        id={'TextField'} type={'text'} />
      <Button alt='Voltar' icon={'/assets/back_arrow_icon.svg'} />
      <Switch />

    </main>
  )
}

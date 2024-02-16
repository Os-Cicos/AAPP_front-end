import UserProvider from '@/context/userContext';
import '../public/fonts/css/fonts.css';
import './globals.css'


export const metadata = {
  title: 'Assistente pessoal personalizado',
  description: 'Made by: Os Ciços',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">

      <body>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  )
}

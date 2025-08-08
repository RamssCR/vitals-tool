import { Debugger } from "@components/debugger/Debugger"
import { Title } from "@components/ui/Title"

export const App = () => {
  return (
    <main className="flex flex-col items-start w-full h-[100svh]">
      <Title size="3xl" className="mx-auto mt-4">Example</Title>
      <Debugger />
    </main>
  )
}
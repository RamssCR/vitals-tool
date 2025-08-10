import { Debugger } from "@components/debugger/Debugger"
import { Title } from "@components/ui/Title"

export const App = () => {
  return (
    <main className="tw:flex tw:flex-col tw:items-start tw:w-full tw:h-[100svh]">
      <Title size="3xl" className="tw:mx-auto tw:mt-4">Example</Title>
      <Debugger />
    </main>
  )
}
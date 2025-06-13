import { CongratulationsSection } from '@/widgets/congratulations-section'
import { redirect } from 'next/navigation'

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ code?: string; email: string }>
}) => {
  const confirmationCode = (await searchParams).code

  if (!confirmationCode) {
    redirect('/')
  }

  return <CongratulationsSection confirmationCode={confirmationCode} />
}

export default page

import { ArticleEditor } from "@/components/admin/ArticleEditor"

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <ArticleEditor slug={slug} />
}

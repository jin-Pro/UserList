export default async function DetailPage({
  params,
}: {
  params: { id: string };
}) {
  console.log('id : ', params.id);
  return (
    <div>
      <h1>Detail</h1>
      <p>Detail your thoughts here...</p>
    </div>
  );
}

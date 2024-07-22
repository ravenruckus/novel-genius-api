
export default async function Novel({ params }: { params: { id: string } }) {

  const id = params.id;
  return (
    <div>
      <h1>Novel: {id} </h1>
    </div>
  );
}

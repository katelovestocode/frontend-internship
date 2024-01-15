export type StarsType = {
  starRating: number;
};

export default function StarRating({ starRating }: StarsType) {
  const starStyle = {
    "--rating": starRating,
  } as any;

  return (
    <div>
      <p className="font-semibold"> User&apos;s Avarage Rating</p>
      <div className="stars" style={starStyle}></div>
    </div>
  );
}

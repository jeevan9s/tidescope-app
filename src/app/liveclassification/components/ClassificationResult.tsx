interface ClassificationResultProps {
  classification: string;
}

export const ClassificationResult = ({
  classification,
}: ClassificationResultProps) => {
  if (!classification) return null;

  return (
    <div className="mt-4 text-lg font-bold text-black bg-white p-4 rounded-md shadow-md">
      Classification Result: <span className="text-blue-600">{classification}</span>
    </div>
  );
};

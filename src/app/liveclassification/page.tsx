import Link from 'next/link';
import "../styles/liveclassification.css";

export default function () {
  return (
    <div className="page">
      <div className="title-cntr2">
        <Link href="/main">
        <h1 id="title2" className="text-white text-center mb-2">
            <span className="text-sky-700 ">Tide</span>
            <span className="text-zinc-100">Scope</span>
          </h1>
        </Link>
      </div>
      <h1>Live Classification Dashboard</h1>
    </div>
  );
}

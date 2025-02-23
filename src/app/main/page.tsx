import Link from 'next/link';
import "../styles/main.css";

export default function Main() {
  return (
    <div className="page">
      <div className="title-cntr">
        <h1 className="title">TideScope</h1>
        <h2 className="subtitle">Welcome!</h2>
      </div>
      <p>
      Analyze <b>past tsunamis</b>, predict <b>future surges</b>, and classify <b>real-time wave activity</b> with AI-powered insights.
      </p>

      <div className="btn-cntr">
      <Link href="/dashboard">
        <button>Get Started</button>
        </Link>
      </div>
    </div>
  );
}

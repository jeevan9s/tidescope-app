import "../styles/dash.css";
import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="page">
      <div className="title-cntr2">
        <Link href = "/main">
        <h1 className="title2">TideScope</h1>
        </Link>
      </div>

      <div className="btns-cntr">

        <Link href = "/prediction">
        <button className="button1">Prediction</button>
        </Link>
        <Link href = "/histclassification">
        <button className="button2">Classification</button>
        </Link>
        <Link href = "/liveclassification">
        <button className="button3">Live Classification</button>
        </Link>
      </div>
    </div>
  );
}

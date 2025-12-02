import "./Loading.css";

export default function Loading({ size = 45, color = "#000" }) {
  return (
    <div
      className="loader"
      style={{
        width: size,
        "--loader-color": color,
      }}
    ></div>
  );
}

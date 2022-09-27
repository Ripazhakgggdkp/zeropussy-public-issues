import Issue from "../interfaces/post";

type Props = {
  issue: Issue;
};

const Issue = ({ issue }: Props) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg flex flex-col">
      <div className="px-6 py-4">
        <div className="font-extralight text-l mb-2">{issue.title}</div>
        <p className="text-gray-700 font-thin text-base">{issue.description}</p>
      </div>
      <div className="px-6 pt-4 pb-2 mt-auto">
        {issue.labels.map(
          (label) =>
            typeof label !== "string" && (
              <span
                className={`inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2`}
                style={{
                  background: `#${label.color}`,
                  color: `${invertColor("#" + label.color)}`,
                }}
              >
                {label.name}
              </span>
            )
        )}
      </div>
    </div>
  );
};

export default Issue;

const invertColor = (hex: string, bw = true) => {
  if (hex.indexOf("#") === 0) {
    hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error("Invalid HEX color.");
  }
  let r = parseInt(hex.slice(0, 2), 16);
  let g = parseInt(hex.slice(2, 4), 16);
  let b = parseInt(hex.slice(4, 6), 16);
  if (bw) {
    // https://stackoverflow.com/a/3943023/112731
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000000" : "#FFFFFF";
  }
  // invert color components
  const ir = (255 - r).toString(16);
  const ig = (255 - g).toString(16);
  const ib = (255 - b).toString(16);
  // pad each with zeros and return
  return "#" + padZero(ir) + padZero(ig) + padZero(ib);
};

const padZero = (str, len = 2) => {
  len = len || 2;
  var zeros = new Array(len).join("0");
  return (zeros + str).slice(-len);
};

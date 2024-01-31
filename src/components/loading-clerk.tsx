import { Vortex } from "react-loader-spinner";
export default function LoadingClerk() {
  return (
    <div className="flex flex-row justify-center items-center h-screen bg-black">
      <Vortex
        visible={true}
        height="80"
        width="80"
        ariaLabel="vortex-loading"
        wrapperStyle={{}}
        wrapperClass="flex flex-row justify-center items-center"
        colors={["red", "green", "blue", "yellow", "orange", "purple"]}
      />
    </div>
  );
}

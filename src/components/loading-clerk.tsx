import { Vortex } from "react-loader-spinner";
export default function LoadingClerk() {
  return (
    <div className="flex h-screen flex-row items-center justify-center bg-black">
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

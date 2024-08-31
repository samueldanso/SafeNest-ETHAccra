import Image from "next/image";

export default function ProtocolsUsed() {
  return (
    <div className="py-5 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl">Powered by</h1>
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 items-center justify-center">
            <Image alt="Optimism" src="/optimism-logo.png" width={158} height={48} className="max-h-8 object-contain" />
            <Image
              alt="The Graph"
              src="/thegraph-logo.png"
              width={158}
              height={48}
              className="max-h-8 object-contain"
            />
            <Image
              alt="Lisk"
              src="/lisk-logo.png" // Corrected path
              width={158}
              height={48}
              className="max-h-10 object-contain"
            />
            <Image
              alt="Scaffold-ETH 2"
              src="/scaffold-logo.png" // Corrected path
              width={158}
              height={48}
              className="max-h-8 object-contain"
            />
            <Image
              alt="Dynamic"
              src="/dynamic-logo.png" // Corrected path
              width={158}
              height={48}
              className="max-h-6 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

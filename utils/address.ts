import CeramicClient from "@ceramicnetwork/http-client";
import { Caip10Link } from "@ceramicnetwork/stream-caip10-link";
import ENS, { getEnsAddress } from "@ensdomains/ensjs";
import { ethers } from "ethers";

const ethAddressRegex = /^0x[0-9a-f]{40}$/i;
export function isEthereumAddress(address: string): boolean {
  return ethAddressRegex.test(address);
}

export function isENS(address: string): boolean {
  return address.endsWith(".ens");
}

export function isSupportedDID(did: string): boolean {
  return did.startsWith("did:3") || did.startsWith("did:key");
}

// ens -> eth address
export async function resolveEns(name: string) {
  const ens = new ENS({
    provider: new ethers.providers.Web3Provider(global.ethereum),
    ensAddress: getEnsAddress("1"),
  });
  return await ens.name(name).getAddress();
}

// eth address -> did
export const addressToDid = async (
  address: string,
  ceramic: CeramicClient
): Promise<string | null> => {
  const { did } = await Caip10Link.fromAccount(
    ceramic,
    `${address.toLowerCase()}@eip155:4`
  );

  if (!did) {
    const result = await Caip10Link.fromAccount(
      ceramic,
      `${address.toLowerCase()}@eip155:80001`
    );
    return result.did;
  }
  return did;
};

// export async function toDid(input: string, ceramic: CeramicClient) {
//   if (isENS(input)) {
//     input = await resolveEns(input);
//   }
//   if (isEthereumAddress(input)) {
//     input = await addressToDid(input, ceramic);
//   }

//   return input;
// }

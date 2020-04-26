import toChecksumAddress from '@authereum/utils/core/toChecksumAddress'

type Addressish = Address | string

export default class Address {
  readonly address: string

  constructor(address: Addressish) {
    this.address = toChecksumAddress(address.toString())
  }

  toString() {
    return this.address
  }

  toLowerCase() {
    return this.address.toLocaleLowerCase()
  }

  eq(address: Addressish) {
    let temp: Address

    if (address instanceof Address) {
      temp = address
    } else {
      try {
        temp = new Address(address)
      } catch (_) {
        return false
      }
    }

    return this.address === temp.address
  }
}
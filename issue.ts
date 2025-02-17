function decorator(target: unknown, key: PropertyKey): void {
  console.log({target, key})
}

export class MyClass {
  @decorator
  a!: string
}

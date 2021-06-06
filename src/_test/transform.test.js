import { readFileSync } from 'fs'
import { split, mixinsFrom, rehydrate } from '../transform'

const yaml = readFileSync(`${__dirname}/test.yml`, { encoding: 'utf-8' })
const yamlCompiled = readFileSync(`${__dirname}/testc.yml`, {
  encoding: 'utf-8',
})

describe('split', () =>
  it('should extract the front matter and body', () => {
    const { frontMatter, body } = split(yaml)
    const fm = `this is front matter!
@mixin foo {
  - bar
  - baz
}

@mixin quux {
  - [ ] quax
}`

    const b = `this is a body

@foo`

    expect(frontMatter).toBe(fm)
    expect(body).toBe(b)
  }))

describe('mixinsFrom', () =>
  it('should extract the right number of mixinsFrom from front matter', () => {
    const { frontMatter } = split(yaml)
    const m = mixinsFrom(frontMatter)
    expect(m).toMatchObject(
      expect.objectContaining({
        foo: expect.any(String),
        quux: expect.any(String),
      })
    )
  }))

describe('rehydrate', () =>
  it('should rehydrate mixins with the correct mixins', () => {
    const { frontMatter, body } = split(yaml)
    const { body: compiledBody } = split(yamlCompiled)

    expect(rehydrate(body, mixinsFrom(frontMatter))).toEqual(compiledBody)
  }))

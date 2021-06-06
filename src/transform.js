export const split = a =>
  a.trim().match(/^'''\n(?<frontMatter>.+)\n'''\n(?<body>.+)\n...$/s).groups

export const mixinsFrom = frontMatter =>
  frontMatter
    .trim()
    .match(/@(?<name>.+?)\s\{(?<body>.+?)\}/gs)
    .reduce(
      (obj, mixin) => ({
        ...obj,
        [mixin.match(/^@mixin (?<name>.+)(?=\s\{)/).groups.name]:
          mixin.match(/\{\n(?<body>.+)\n\}/s).groups.body,
      }),
      {}
    )

export const rehydrate = (body, mixins) =>
  body.replace(/(?<=\n)@(?<name>.+)$/, (_, name) => mixins[name])

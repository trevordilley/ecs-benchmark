import { edict } from '@edict/core'

// Based on this benchmark: https://github.com/noctjs/ecs-benchmark
export default () => {
  const session = edict()

  session
    .rule('A', ({delta}) => ({
      dt: {
        delta
      },
      $ent: {
        A: { then: false },
      },
    }))
    .enact({
      then: ({ $ent }) =>
        session.insert({
          [$ent.id]: {
            A: $ent.A * 2,
          },
        }),
    })

  session
    .rule('B', ({delta}) => ({
      dt: {
        delta
      },
      $ent: {
        B: { then: false },
      },
    }))
    .enact({
      then: ({ $ent }) =>
        session.insert({
          [$ent.id]: {
            B: $ent.B * 2,
          },
        }),
    })

  session
    .rule('C', ({delta}) => ({
      dt: {
        delta
      },
      $ent: {
        C: { then: false },
      },
    }))
    .enact({
      then: ({ $ent }) =>
        session.insert({
          [$ent.id]: {
            C: $ent.C * 2,
          },
        }),
    })

  session
    .rule('D', ({delta}) => ({
      dt: {
        delta
      },
      $ent: {
        D: { then: false },
      },
    }))
    .enact({
      then: ({ $ent }) =>
        session.insert({
          [$ent.id]: {
            D: $ent.D * 2,
          },
        }),
    })

  const E = session
    .rule('E', ({delta}) => ({
      dt: {
        delta
      },
      $ent: {
        E: { then: false },
      },
    }))
    .enact({
      then: ({ $ent }) =>
        session.insert({
          [$ent.id]: {
            E: $ent.E * 2,
          },
        }),
    })

  for (let i = 0; i < 1000; i++) {
    session.insert({
      [i]: {
        A: 1,
        B: 1,
        C: 1,
        D: 1,
        E: 1,
      },
    })
  }
  return () => {
    session.insert({
      dt: {
        delta: 1
      }
    })
    session.fire()
  }
}

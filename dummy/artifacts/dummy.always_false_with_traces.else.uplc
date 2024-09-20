(program
  1.1.0
  [
    (lam
      i_0
      [
        (lam
          i_1
          [
            (lam
              i_2
              [
                (lam
                  i_3
                  [
                    (lam
                      i_4
                      (lam
                        i_5
                        (force
                          [
                            [
                              [
                                i_4
                                [
                                  (lam
                                    i_6
                                    [
                                      (lam
                                        i_7
                                        [
                                          (lam
                                            i_8
                                            [
                                              (lam
                                                i_9
                                                [
                                                  (lam
                                                    i_10
                                                    (force
                                                      [
                                                        [
                                                          i_3
                                                          (con
                                                            string
                                                            "this is a trace message"
                                                          )
                                                        ]
                                                        (delay
                                                          (force
                                                            [
                                                              [
                                                                i_3
                                                                (con
                                                                  string
                                                                  "this is another trace message"
                                                                )
                                                              ]
                                                              (delay
                                                                (con bool False)
                                                              )
                                                            ]
                                                          )
                                                        )
                                                      ]
                                                    )
                                                  )
                                                  [ i_1 [ i_0 i_8 ] ]
                                                ]
                                              )
                                              [ i_1 i_8 ]
                                            ]
                                          )
                                          [ i_0 i_6 ]
                                        ]
                                      )
                                      [ i_1 i_6 ]
                                    ]
                                  )
                                  [ i_2 [ (builtin unConstrData) i_5 ] ]
                                ]
                              ]
                              (delay (con unit ()))
                            ]
                            (delay
                              (force
                                [
                                  [
                                    i_3 (con string "Validator returned false")
                                  ]
                                  (delay [ (error ) (force (error )) ])
                                ]
                              )
                            )
                          ]
                        )
                      )
                    )
                    (force (builtin ifThenElse))
                  ]
                )
                (force (builtin trace))
              ]
            )
            (force (force (builtin sndPair)))
          ]
        )
        (force (builtin headList))
      ]
    )
    (force (builtin tailList))
  ]
)
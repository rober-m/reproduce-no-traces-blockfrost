# Repo to demonstrate [issue 297](https://github.com/blockfrost/blockfrost-js/issues/297)

## Notes

- `dummy` is a folder containing the on-chain code to be submitted by the script inside the `off-chain` folder.
- There's no need to do anything on the `dummy` folder. The relevant files to inspect (if necesary) are:
    - `dummy/validators/dummy.ak`: validator source code
    - `dummy/plutus.json`: validator cbor and hash
    - `dummy/artifacts/dummy.always_false_with_traces.else.uplc`: UPCL code that we're submitting to the chain
- The validators were compiled with the command: `aiken build --trace-level verbose --filter-traces all --uplc`

## Steps to reproduce issue:

1. `cd` into the `off-chain` folder.
1. Run `npm install` to install dependencies.
1. Add your blockfrost API key 
1. If you need a new wallet, uncomment line 15 and use the faucet to get some funds.
1. Run `npx tsx index.ts` to submit the on-chain code to the chain.
1. Notice that the response of the evaluation returns `{ EvaluationFailure: { ScriptFailures: {} } }` even though the script does have traces.

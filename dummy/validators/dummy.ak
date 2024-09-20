/// "Burn" (always false) validator without trace messages
validator always_false {
  else(_) {
    False
  }
}

/// "Burn" (always false) validator with trace messages
validator always_false_with_traces {
  else(_) {
    trace @"this is a trace message"
    trace @"this is another trace message"
    False
  }
}

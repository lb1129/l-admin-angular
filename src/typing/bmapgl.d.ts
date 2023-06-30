/// <reference types="bmapgl" />

declare namespace BMapGL {
  interface LocationControlOptions {
    anchor?: ControlAnchor | undefined
    offset?: Size | undefined
  }
  class LocationControl extends Control {
    constructor(ops?: LocationControlOptions)
  }
}

// Import statements for signals and hooks from the preact library
const { signal } = preact;

/**
 * Signal for tracking window size.
 *
 * This signal keeps track of the window's width (x) and height (y).
 * It updates its values whenever the window is resized.
 */
const deviceState = signal({
  x: window.innerWidth,
  y: window.innerHeight,
});

// Window resize event listener
window.addEventListener("resize", () => {
  deviceState.value = {
    x: window.innerWidth,
    y: window.innerHeight,
  };
});

interface DeviceConfig {
  xs: number;
  sm: number;
  md: number;
  lg: number;
}

/**
 * Device class to handle configuration and window size state.
 */
class Device {
  private _config: DeviceConfig;

  /**
   * Creates an instance of Device.
   *
   * @param {DeviceConfig} config - The configuration object for device breakpoints.
   */
  constructor(config: DeviceConfig) {
    this._config = config;
  }

  /**
   * Updates the configuration for device breakpoints.
   *
   * @param {Partial<DeviceConfig>} updates - The updated configuration values.
   */
  config(updates: Partial<DeviceConfig>): void {
    this._config = { ...this._config, ...updates };
  }

  /**
   * Gets the current window width.
   *
   * @returns {number} - The current window width.
   */
  get x(): number {
    return deviceState.value.x;
  }

  /**
   * Gets the current window height.
   *
   * @returns {number} - The current window height.
   */
  get y(): number {
    return deviceState.value.y;
  }

  /**
   * Gets the current device size based on the width.
   *
   * @returns {string} - The current device size ('xs', 'sm', 'md', 'lg', or 'xl').
   */
  get size(): string {
    if (deviceState.value.x <= this._config.xs) {
      return "xs";
    } else if (deviceState.value.x <= this._config.sm) {
      return "sm";
    } else if (deviceState.value.x <= this._config.md) {
      return "md";
    } else if (deviceState.value.x <= this._config.lg) {
      return "lg";
    } else {
      return "xl";
    }
  }

  get keys() {
    return ["xs", "sm", "md", "lg", "xl"];
  }

  get mobile() {
    return this.is("xs", "sm", "md");
  }

  is(...vals) {
    return vals.includes(this.size) ? true : false;
  }
}

// Device configuration with breakpoints
const device = new Device({
  xs: 576,
  sm: 768,
  md: 992,
  lg: 1200,
});

export default device;

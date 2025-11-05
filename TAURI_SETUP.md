# Tauri Setup Guide for Dooshen Wallpaper

This guide will help you set up the Tauri development environment for the Dooshen Wallpaper desktop application.

## Prerequisites

### 1. Install Rust

Tauri requires Rust to build the native backend. Install Rust using `rustup`:

**Windows:**
1. Visit [https://www.rust-lang.org/tools/install](https://www.rust-lang.org/tools/install)
2. Download and run `rustup-init.exe`
3. Follow the installation prompts
4. Restart your terminal/PowerShell after installation

**Verify Installation:**
```bash
rustc --version
cargo --version
```

### 2. Install Visual Studio Build Tools (Windows Only)

Tauri requires C++ build tools on Windows:

1. Download [Visual Studio Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/)
2. During installation, select the **"Desktop Development with C++"** workload
3. This includes:
   - MSVC v143 - VS 2022 C++ x64/x86 build tools
   - Windows 10/11 SDK
   - C++ CMake tools

**Note:** This is a large download (~6GB) and may take some time.

### 3. Install WebView2 Runtime (Windows Only)

Tauri uses WebView2 to render web content on Windows.

- **Windows 11:** WebView2 is pre-installed
- **Windows 10:** Download from [Microsoft's WebView2 page](https://developer.microsoft.com/en-us/microsoft-edge/webview2/)

### 4. Node.js (Already Installed)

You should already have Node.js installed since you're working with an Expo project. Verify:

```bash
node --version
npm --version
```

## Project Setup

### 1. Install Dependencies

The project dependencies have already been installed, including:
- `@tauri-apps/cli` - Tauri CLI tools
- `@tauri-apps/api` - Tauri JavaScript API

### 2. Project Structure

Your project now has:
- `src-tauri/` - Rust backend code and Tauri configuration
- `src-tauri/src/` - Rust source files
- `src-tauri/tauri.conf.json` - Tauri configuration
- `src-tauri/Cargo.toml` - Rust dependencies

## Running the Application

### Development Mode

1. **Start the Expo web server:**
   ```bash
   npm run web
   ```
   This starts the Expo development server on `http://localhost:8081`

2. **In a new terminal, run Tauri in dev mode:**
   ```bash
   npm run tauri:dev
   ```
   This will:
   - Build the Rust backend
   - Launch the desktop window
   - Hot-reload on code changes

### Building for Production

To create a distributable executable:

```bash
npm run tauri:build
```

This will:
1. Build the Expo web app (`npm run web:build`)
2. Compile the Rust backend
3. Package everything into an installer/executable
4. Output files will be in `src-tauri/target/release/bundle/`

**Windows:** Creates an `.msi` installer and `.exe` file

## Configuration

### Tauri Configuration (`src-tauri/tauri.conf.json`)

- **App Name:** `dooshen-wallpaper`
- **Window Title:** `Dooshen Wallpaper`
- **Window Size:** 1200x800 (min: 800x600)
- **Dev URL:** `http://localhost:8081`
- **Build Output:** `../dist` (Expo web export)

### Available Scripts

- `npm run web` - Start Expo web dev server
- `npm run web:build` - Build Expo web app for production
- `npm run tauri:dev` - Run Tauri in development mode
- `npm run tauri:build` - Build Tauri app for production
- `npm run tauri` - Access Tauri CLI directly

## Troubleshooting

### Common Issues

1. **"rustc not found"**
   - Make sure Rust is installed and terminal is restarted
   - Check that `C:\Users\YourName\.cargo\bin` is in your PATH

2. **"link.exe not found" (Windows)**
   - Install Visual Studio Build Tools with C++ workload
   - Restart terminal after installation

3. **"WebView2 not found"**
   - Download and install WebView2 Runtime from Microsoft

4. **Build errors related to Expo**
   - Make sure Expo web server is running before `tauri:dev`
   - For production builds, ensure `npm run web:build` completes successfully

5. **Port 8081 already in use**
   - Change the port in `app.json` or kill the process using port 8081
   - Update `src-tauri/tauri.conf.json` `devUrl` accordingly

### First Build

The first time you run `npm run tauri:dev` or `npm run tauri:build`, Rust will:
- Download the Rust toolchain (if needed)
- Compile all dependencies (this can take 5-15 minutes)
- Subsequent builds will be much faster

## Next Steps

1. **Customize the app icon:**
   - Replace icons in `src-tauri/icons/` with your own
   - Icons are already generated, but you can customize them

2. **Add Tauri APIs:**
   - Import from `@tauri-apps/api` in your React components
   - Example: File system access, window management, system dialogs

3. **Configure security:**
   - Review `src-tauri/capabilities/default.json` for API permissions
   - Adjust CSP (Content Security Policy) in `tauri.conf.json` if needed

## Resources

- [Tauri Documentation](https://tauri.app/docs/)
- [Tauri API Reference](https://tauri.app/api/)
- [Rust Documentation](https://doc.rust-lang.org/)
- [Expo Web Documentation](https://docs.expo.dev/workflow/web/)

## Support

If you encounter issues:
1. Check the Tauri [Troubleshooting Guide](https://tauri.app/docs/guides/troubleshooting)
2. Review the [Tauri Discord](https://discord.gg/tauri) community
3. Check the [GitHub Issues](https://github.com/tauri-apps/tauri/issues)


# Building Windows .exe File

## Prerequisites

1. **Install Rust** (if not already installed):
   - Visit https://rustup.rs/
   - Download and run the installer
   - Follow the installation instructions
   - Restart your terminal after installation

2. **Install Microsoft C++ Build Tools** (REQUIRED for Windows):
   - Download Visual Studio Build Tools: https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022
   - Run the installer
   - Select **"Desktop development with C++"** workload
   - Make sure these components are checked:
     - MSVC v143 - VS 2022 C++ x64/x86 build tools
     - Windows 10/11 SDK (latest version)
   - Click "Install" and wait for completion
   - **Restart your computer** after installation

3. **Verify Installation**:
   ```powershell
   cargo --version
   rustc --version
   ```

## Build Steps

### Step 1: Build the Web Version
```powershell
npm run web:build
```
This creates the `dist` folder with the static web files.

### Step 2: Build the Windows Executable
```powershell
npm run tauri:build
```

This will:
- Compile the Rust backend
- Bundle the web frontend
- Create the .exe file in `src-tauri/target/release/`

## Output Location

After a successful build, you'll find:
- **Executable**: `src-tauri/target/release/dooshen-wallpaper.exe`
- **Installer** (optional): `src-tauri/target/release/bundle/msi/dooshen-wallpaper_0.1.0_x64_en-US.msi`

## Troubleshooting

### Error: `linker 'link.exe' not found`
**Solution**: Install Visual Studio Build Tools with C++ workload (see Prerequisites #2)

### If Rust is not found:
1. Install Rust from https://rustup.rs/
2. Restart your terminal
3. Run the setup script: `.\setup-rust-path.ps1`
4. Try building again

### If build fails:
- Make sure all dependencies are installed: `npm install`
- Check that the `dist` folder exists (from web:build)
- Ensure you have enough disk space (Rust builds can be large)
- **Restart your computer** after installing Visual Studio Build Tools

## Development Mode

To test the app before building:
```powershell
npm run tauri:dev
```

This runs the app in development mode with hot reload.


# Add Rust to PATH permanently
$cargoPath = "$env:USERPROFILE\.cargo\bin"
$currentPath = [Environment]::GetEnvironmentVariable("Path", "User")

if ($currentPath -notlike "*$cargoPath*") {
    [Environment]::SetEnvironmentVariable("Path", "$currentPath;$cargoPath", "User")
    Write-Host "Rust has been added to your PATH permanently." -ForegroundColor Green
    Write-Host "Please restart your terminal for changes to take effect." -ForegroundColor Yellow
} else {
    Write-Host "Rust is already in your PATH." -ForegroundColor Green
}

# Add to current session
$env:Path += ";$cargoPath"

Write-Host "`nVerifying Rust installation..." -ForegroundColor Cyan
cargo --version
rustc --version


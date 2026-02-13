# MongoDB Import Script für CSS Insurance Platform (PowerShell)
#
# Dieses Script importiert die Testdaten direkt in MongoDB
#
# Voraussetzungen:
#   - MongoDB muss laufen
#   - mongoimport muss installiert sein
#
# Verwendung:
#   .\import-to-mongodb.ps1
#   .\import-to-mongodb.ps1 -MongoUri "mongodb://localhost:27017/insurance"

param(
    [string]$MongoUri = "mongodb://localhost:27017/insurance",
    [string]$DatabaseName = "insurance"
)

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  MongoDB Import - CSS Insurance" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "MongoDB URI: $MongoUri"
Write-Host "Database: $DatabaseName"
Write-Host ""

# Check if mongoimport is available
try {
    $null = Get-Command mongoimport -ErrorAction Stop
} catch {
    Write-Host "❌ mongoimport not found. Please install MongoDB Database Tools." -ForegroundColor Red
    Write-Host "   Download: https://www.mongodb.com/try/download/database-tools" -ForegroundColor Yellow
    exit 1
}

# Get script directory
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

# Function to import collection
function Import-Collection {
    param(
        [string]$CollectionName,
        [string]$FileName,
        [string]$Icon
    )

    Write-Host "$Icon Importing $CollectionName..." -ForegroundColor Yellow

    $filePath = Join-Path $ScriptDir $FileName

    if (-not (Test-Path $filePath)) {
        Write-Host "  ❌ File not found: $filePath" -ForegroundColor Red
        return $false
    }

    $arguments = @(
        "--uri=`"$MongoUri`"",
        "--collection=$CollectionName",
        "--file=`"$filePath`"",
        "--jsonArray",
        "--drop"
    )

    $process = Start-Process -FilePath "mongoimport" `
        -ArgumentList $arguments `
        -NoNewWindow `
        -Wait `
        -PassThru

    if ($process.ExitCode -eq 0) {
        Write-Host "  ✅ $CollectionName imported successfully" -ForegroundColor Green
        return $true
    } else {
        Write-Host "  ❌ Failed to import $CollectionName" -ForegroundColor Red
        return $false
    }
}

# Import collections
$offersSuccess = Import-Collection -CollectionName "offers" -FileName "offers.json" -Icon "📄"
Write-Host ""

$policiesSuccess = Import-Collection -CollectionName "policies" -FileName "policies.json" -Icon "📋"
Write-Host ""

$claimsSuccess = Import-Collection -CollectionName "claims" -FileName "claims.json" -Icon "🔔"
Write-Host ""

# Summary
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  Import Complete!" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

$successCount = @($offersSuccess, $policiesSuccess, $claimsSuccess) | Where-Object { $_ -eq $true } | Measure-Object | Select-Object -ExpandProperty Count

if ($successCount -eq 3) {
    Write-Host "✅ All data has been imported to MongoDB successfully" -ForegroundColor Green
} elseif ($successCount -gt 0) {
    Write-Host "⚠️  Some collections were imported, but there were errors" -ForegroundColor Yellow
} else {
    Write-Host "❌ Import failed. Please check the errors above." -ForegroundColor Red
    exit 1
}

Write-Host ""


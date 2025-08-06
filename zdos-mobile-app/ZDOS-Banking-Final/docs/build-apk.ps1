# ZDOS Banking - Build APK PowerShell Script
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host "🏦 ZDOS BANKING ENTERPRISE - BUILD APK" -ForegroundColor Green
Write-Host "===========================================" -ForegroundColor Cyan

try {
    # Verifica Node.js
    Write-Host "`n📋 Verifica Node.js..." -ForegroundColor Yellow
    $nodeVersion = node --version 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Node.js versione: $nodeVersion" -ForegroundColor Green
    } else {
        Write-Host "❌ Node.js non trovato" -ForegroundColor Red
        exit 1
    }

    # Verifica Cordova
    Write-Host "`n🔧 Verifica Cordova..." -ForegroundColor Yellow
    $cordovaVersion = cordova --version 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Cordova versione: $cordovaVersion" -ForegroundColor Green
    } else {
        Write-Host "❌ Cordova non trovato, installo..." -ForegroundColor Yellow
        npm install -g cordova
    }

    # Pulisci build precedente
    Write-Host "`n🧹 Pulizia build precedente..." -ForegroundColor Yellow
    if (Test-Path "platforms\android\app\build") {
        Remove-Item "platforms\android\app\build" -Recurse -Force -ErrorAction SilentlyContinue
        Write-Host "✅ Build precedente rimosso" -ForegroundColor Green
    }

    # Build APK
    Write-Host "`n🚀 Avvio build APK..." -ForegroundColor Yellow
    $buildResult = cordova build android --debug 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ BUILD APK COMPLETATO!" -ForegroundColor Green
        $apkPath = "platforms\android\app\build\outputs\apk\debug\app-debug.apk"
        if (Test-Path $apkPath) {
            $apkSize = (Get-Item $apkPath).Length / 1MB
            Write-Host "📱 APK generato: $apkPath" -ForegroundColor Cyan
            Write-Host "📊 Dimensione APK: $([math]::Round($apkSize, 2)) MB" -ForegroundColor Cyan
            
            # Copia APK nella root per facilità
            Copy-Item $apkPath "ZDOS-Banking-Enterprise.apk" -Force
            Write-Host "📋 APK copiato come: ZDOS-Banking-Enterprise.apk" -ForegroundColor Green
        } else {
            Write-Host "⚠️ APK non trovato nel percorso atteso" -ForegroundColor Yellow
        }
    } else {
        Write-Host "❌ Errore durante il build:" -ForegroundColor Red
        Write-Host $buildResult -ForegroundColor Red
        
        # Prova metodo alternativo con gradle
        Write-Host "`n🔄 Provo con Gradle diretto..." -ForegroundColor Yellow
        Set-Location "platforms\android"
        $gradleResult = .\gradlew assembleDebug 2>&1
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Build Gradle completato!" -ForegroundColor Green
        } else {
            Write-Host "❌ Errore anche con Gradle:" -ForegroundColor Red
            Write-Host $gradleResult -ForegroundColor Red
        }
        Set-Location "..\\.."
    }

} catch {
    Write-Host "❌ Errore durante l'esecuzione: $($_.Exception.Message)" -ForegroundColor Red
} finally {
    Write-Host "`n🏁 Processo completato!" -ForegroundColor Cyan
    Write-Host "Premi un tasto per continuare..." -ForegroundColor Yellow
    Read-Host
}

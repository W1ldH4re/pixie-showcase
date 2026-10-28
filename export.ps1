# Сохраняет картинки для Twitch (панели и баннер) в папку export\
# Запуск:  powershell -ExecutionPolicy Bypass -File export.ps1
# Нужен Microsoft Edge (есть в Windows) и интернет — для шрифтов.

$root = $PSScriptRoot
$out  = Join-Path $root "export"
New-Item -ItemType Directory -Force $out | Out-Null

$edge = @(
  "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
  "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe"
) | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $edge) { Write-Error "Не найден Microsoft Edge"; exit 1 }

$profile = Join-Path $env:TEMP "pixie-export-profile"
$base = "file:///" + ($root -replace '\\', '/')

function Shot($page, $file, $w, $h, $scale = 2) {
  $target = Join-Path $out $file
  & $edge --headless=new --disable-gpu --hide-scrollbars --user-data-dir="$profile" `
    --allow-file-access-from-files --force-device-scale-factor=$scale --window-size="$w,$h" `
    --virtual-time-budget=4000 --default-background-color=00000000 `
    --screenshot="$target" "$base/$page" 2>$null | Out-Null
  Start-Sleep -Milliseconds 300
  if (Test-Path $target) { Write-Host "готово: export\$file" } else { Write-Host "не получилось: $file" }
}

$names = @("about", "schedule", "rules", "support", "socials", "setup")
for ($i = 0; $i -lt $names.Count; $i++) {
  Shot "panels/panel.html?i=$i" ("panel-{0}-{1}.png" -f ($i + 1), $names[$i]) 320 100
}
Shot "panels/panel.html?schedule" "panel-schedule-card.png" 320 300
Shot "panels/banner.html" "profile-banner.png" 1200 480
Shot "scenes/ending.html" "offline-screen.png" 1920 1080 1

# Весь дизайн одной картинкой: сначала узнаём высоту листа, потом снимаем ровно по ней
$dom = & $edge --headless=new --disable-gpu --user-data-dir="$profile" --allow-file-access-from-files `
  --window-size="2000,4000" --virtual-time-budget=4000 --dump-dom "$base/showcase.html" 2>$null | Out-String
$height = if ($dom -match 'data-height="(\d+)"') { [int]$Matches[1] } else { 4600 }
Shot "showcase.html" "pixie-showcase.png" 2000 $height 1

Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

$savePath = "C:\Users\USER\Andrew\andrew-portfolio\uiland.design"
$screen = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds
$urls = @(
    "https://uiland.design",
    "https://uiland.design",
    "https://uiland.design",
    "https://uiland.design/pricing"
)
$scrollAmounts = @(0, 800, 1800, 0)
$names = @("uiland_1_browse.png","uiland_2_gallery.png","uiland_3_apps.png","uiland_4_pricing.png")

# Give time to switch to Chrome
Start-Sleep -Seconds 4

for ($i = 0; $i -lt 4; $i++) {
    # Scroll to position
    [System.Windows.Forms.SendKeys]::SendWait("^{Home}")
    Start-Sleep -Milliseconds 500
    if ($scrollAmounts[$i] -gt 0) {
        $scrollTimes = [Math]::Ceiling($scrollAmounts[$i] / 120)
        for ($j = 0; $j -lt $scrollTimes; $j++) {
            [System.Windows.Forms.SendKeys]::SendWait("{PGDN}")
            Start-Sleep -Milliseconds 150
        }
    }
    Start-Sleep -Seconds 2

    # Take screenshot
    $bmp = New-Object Drawing.Bitmap($screen.Width, $screen.Height)
    $gfx = [Drawing.Graphics]::FromImage($bmp)
    $gfx.CopyFromScreen($screen.Location, [Drawing.Point]::Empty, $screen.Size)
    $bmp.Save("$savePath\$($names[$i])")
    $gfx.Dispose()
    $bmp.Dispose()

    Start-Sleep -Seconds 1
}

[System.Windows.Forms.MessageBox]::Show("4 screenshots saved to portfolio!", "Done")

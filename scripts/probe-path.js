const { readdirSync } = require("fs")
const { execSync } = require("child_process")

console.log("[v0] __dirname:", __dirname)
console.log("[v0] process.cwd():", process.cwd())
try {
  const out = execSync("find /vercel -name 'page.tsx' -path '*/app/page.tsx' 2>/dev/null | head -5").toString()
  console.log("[v0] page.tsx locations:", out)
} catch(e) {
  console.log("[v0] find error:", e.message)
}
try {
  const out2 = execSync("ls /").toString()
  console.log("[v0] root dirs:", out2)
} catch(e) {
  console.log("[v0] ls error:", e.message)
}

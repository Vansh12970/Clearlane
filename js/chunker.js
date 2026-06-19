/* Clearlane — export & chunking helpers
   Converts result rows back to CSV text and triggers browser downloads.
   Large datasets are split into N-row chunks and bundled into a .zip.
*/

function downloadBlob(content, filename, type = "text/csv;charset=utf-8;") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function buildCleanCSV(results) {
  const validRows = results.filter((r) => r.valid).map((r) => r.row);
  return Papa.unparse(validRows);
}

function buildRejectedCSV(results) {
  const rejected = results
    .filter((r) => !r.valid)
    .map((r) => ({ ...r.row, validation_errors: r.errors.join(" | ") }));
  return Papa.unparse(rejected);
}

function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

async function buildChunkZip(results, chunkSize) {
  const validRows = results.filter((r) => r.valid).map((r) => r.row);
  const chunks = chunkArray(validRows, chunkSize);

  const zip = new JSZip();
  chunks.forEach((chunk, i) => {
    const csv = Papa.unparse(chunk);
    const partNumber = String(i + 1).padStart(2, "0");
    zip.file(`clearlane_part-${partNumber}.csv`, csv);
  });

  const blob = await zip.generateAsync({ type: "blob" });
  return { blob, count: chunks.length };
}

function timestampSlug() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(
    d.getMinutes()
  )}`;
}

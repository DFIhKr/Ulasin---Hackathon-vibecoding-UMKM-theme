import { OAuth2Client } from 'google-auth-library';
import * as readline from 'readline';
import 'dotenv/config';

// Mengambil Client ID & Secret dari .env (pastikan sudah ada di file .env Anda)
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'CLIENT_ID_ANDA_DI_SINI';
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || 'CLIENT_SECRET_ANDA_DI_SINI';

// Redirect URI yang digunakan. 
// Pastikan Anda telah menambahkan "http://localhost:3000/oauth2callback" 
// di bagian "Authorized redirect URIs" pada Google Cloud Console Anda.
const REDIRECT_URI = 'http://localhost:3000/oauth2callback'; 

const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function getRefreshToken() {
  if (CLIENT_ID === 'CLIENT_ID_ANDA_DI_SINI') {
    console.error("❌ Peringatan: GOOGLE_CLIENT_ID belum disetel di .env!");
  }

  // Generate URL Autentikasi
  const authUrl = client.generateAuthUrl({
    access_type: 'offline', // Wajib 'offline' agar Google memberikan Refresh Token
    prompt: 'consent',      // Memaksa persetujuan ulang untuk memastikan Refresh Token dikirim
    scope: ['https://www.googleapis.com/auth/business.manage'],
  });

  console.log('\n======================================================');
  console.log('🔑 SCRIPT GENERATOR REFRESH TOKEN GOOGLE BUSINESS');
  console.log('======================================================\n');
  console.log('1. Buka URL berikut di browser Anda:\n');
  console.log(authUrl);
  console.log('\n2. Login dengan akun Google Master Anda dan Izinkan (Continue).');
  console.log('3. Browser akan mengarahkan Anda ke URL kosong/error seperti:');
  console.log('   http://localhost:3000/oauth2callback?code=4/0AeaY...&scope=...');
  console.log('4. Copy HANYA teks kode-nya saja (setelah "code=" dan sebelum "&scope=").');
  console.log('   Atau copy seluruh URL-nya jika bingung.\n');

  rl.question('👉 Masukkan Kode (atau paste full URL) di sini: ', async (input) => {
    try {
      // Jika user mem-paste full URL, kita ekstrak kodenya
      let code = input.trim();
      if (code.startsWith('http')) {
        const urlObj = new URL(code);
        code = urlObj.searchParams.get('code') || code;
      }

      console.log('\n⏳ Sedang menukar kode dengan Refresh Token...');
      const { tokens } = await client.getToken(code);
      
      console.log('\n✅ BERHASIL! Ini adalah token Anda:\n');
      console.log('======================================================');
      console.log('🔄 REFRESH TOKEN : ', tokens.refresh_token);
      console.log('======================================================\n');
      console.log('Simpan Refresh Token di atas ke dalam file .env Anda sebagai:');
      console.log('GOOGLE_REFRESH_TOKEN="'+ (tokens.refresh_token || 'TOKEN_TIDAK_DIDAPATKAN') +'"\n');

    } catch (error) {
      console.error('\n❌ Gagal mendapatkan token. Pastikan kode yang dimasukkan benar.');
      console.error('Pesan Error:', error.message);
    } finally {
      rl.close();
    }
  });
}

getRefreshToken();

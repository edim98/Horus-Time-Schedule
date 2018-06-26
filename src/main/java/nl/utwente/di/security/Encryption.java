package nl.utwente.di.security;

import javax.crypto.*;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.security.*;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.InvalidParameterSpecException;
import java.util.Base64;

public class Encryption {

    private String sessionPassword;
    private SecretKeySpec key;

    public Encryption() {
        String SALTCHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890;";
        StringBuilder salt = new StringBuilder();
        SecureRandom srnd = new SecureRandom();
        while (salt.length() < 20) {
            int index = (int) (srnd.nextFloat() * SALTCHARS.length());
            salt.append(SALTCHARS.charAt(index));
        }
        this.sessionPassword = salt.toString();
    }

    public String encrypt(String message) throws NoSuchPaddingException, NoSuchAlgorithmException, InvalidParameterSpecException, UnsupportedEncodingException, BadPaddingException, IllegalBlockSizeException, InvalidKeySpecException, InvalidKeyException {
        this.key = createSeceretKey(this.sessionPassword);
        Cipher pbeCipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        pbeCipher.init(Cipher.ENCRYPT_MODE, key);
        AlgorithmParameters parameters = pbeCipher.getParameters();
        IvParameterSpec ivParameterSpec = parameters.getParameterSpec(IvParameterSpec.class);
        byte[] cryptoText = pbeCipher.doFinal(message.getBytes("UTF-8"));
        byte[] iv = ivParameterSpec.getIV();
        String encodedIV = Base64.getEncoder().encodeToString(iv).replace("==", "");
        String encodedCryptoText = Base64.getEncoder().encodeToString(cryptoText).replace("==", "");
        return new String(Base64.getEncoder().encode((encodedIV + ":" + encodedCryptoText).getBytes()));
    }

    public String decrypt(String string) throws NoSuchPaddingException, NoSuchAlgorithmException, InvalidAlgorithmParameterException, InvalidKeyException, BadPaddingException, IllegalBlockSizeException, UnsupportedEncodingException {
        string = new String (Base64.getDecoder().decode(string));
        String iv = string.split(":")[0].concat("==");
        String message = string.split(":")[1].concat("==");
        Cipher pbeCipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        pbeCipher.init(Cipher.DECRYPT_MODE, key, new IvParameterSpec(Base64.getDecoder().decode(iv)));
        return new String(pbeCipher.doFinal(Base64.getDecoder().decode(message)), "UTF-8");
    }

    private SecretKeySpec createSeceretKey(String sessionPassword) throws NoSuchAlgorithmException, InvalidKeySpecException {
        char[] password = sessionPassword.toCharArray();
        if (password == null) {
            throw new IllegalArgumentException("");
        }
        byte[] salt = new String("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789").getBytes();
        int iteration = 100000;
        int keyLength = 128;
        SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA512");
        PBEKeySpec keySpec = new PBEKeySpec(password, salt, iteration, keyLength);
        SecretKey keyTmp = keyFactory.generateSecret(keySpec);
        return new SecretKeySpec(keyTmp.getEncoded(), "AES");
    }

    public static void main(String[] args) {
        Encryption e = new Encryption();
        try {
            System.out.println(e.encrypt("Un text anume"));
            System.out.println(e.decrypt(e.encrypt("Muie la ma-ta")));
        } catch (NoSuchPaddingException e1) {
            e1.printStackTrace();
        } catch (NoSuchAlgorithmException e1) {
            e1.printStackTrace();
        } catch (InvalidParameterSpecException e1) {
            e1.printStackTrace();
        } catch (UnsupportedEncodingException e1) {
            e1.printStackTrace();
        } catch (BadPaddingException e1) {
            e1.printStackTrace();
        } catch (IllegalBlockSizeException e1) {
            e1.printStackTrace();
        } catch (InvalidKeySpecException e1) {
            e1.printStackTrace();
        } catch (InvalidKeyException e1) {
            e1.printStackTrace();
        } catch (InvalidAlgorithmParameterException e1) {
            e1.printStackTrace();
        }
    }

}

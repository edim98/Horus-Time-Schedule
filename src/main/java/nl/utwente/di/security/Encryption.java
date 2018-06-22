package nl.utwente.di.security;

import java.security.SecureRandom;

public class Encryption {

    public Encryption() {
        String SALTCHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890;";
        StringBuilder salt = new StringBuilder();
        SecureRandom srnd = new SecureRandom();
        while (salt.length() < 20) {
            int index = (int) (srnd.nextFloat() * SALTCHARS.length());
            salt.append(SALTCHARS.charAt(index));
        }
        
    }

}

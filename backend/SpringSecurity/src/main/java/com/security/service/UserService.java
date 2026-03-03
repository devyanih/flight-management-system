package com.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.security.entity.User;
import com.security.repository.UserRepository;


@Service
public class UserService
{
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    public User register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User findByUserNameAndPassword(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.findByUserNameAndPassword(user.getUserName(),user.getPassword());
     }

    public String verify(User user)
    {
        Authentication authenticate = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUserName(), user.getPassword())     );

//        var user1 = userRepository.findByUserName(user.getUserName());
        if(authenticate.isAuthenticated())
        {
        	User dbUser = userRepository.findByUserName(user.getUserName());

            if (dbUser == null || dbUser.getRole() == null) {
                throw new IllegalArgumentException("User role is null — cannot generate JWT.");
            }
            //return jwtService.generateToken(user);
            return jwtService.generateToken(dbUser);
        }
        return "failure";
    }
}


package com.ecommerce.project.service;

import com.ecommerce.project.model.AppRole;
import com.ecommerce.project.model.Role;
import com.ecommerce.project.model.User;
import com.ecommerce.project.payload.AuthenticationResult;
import com.ecommerce.project.payload.UserDTO;
import com.ecommerce.project.payload.UserResponse;
import com.ecommerce.project.repositories.RoleRepository;
import com.ecommerce.project.repositories.UserRepository;
import com.ecommerce.project.security.jwt.JwtUtils;
import com.ecommerce.project.security.request.LoginRequest;
import com.ecommerce.project.security.request.SignupRequest;
import com.ecommerce.project.security.response.MessageResponse;
import com.ecommerce.project.security.response.UserInfoResponse;
import com.ecommerce.project.security.services.UserDetailsImpl;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AuthServiceImpl implements AuthService {

  @Autowired UserRepository userRepository;

  @Autowired PasswordEncoder encoder;

  @Autowired RoleRepository roleRepository;

  @Autowired private AuthenticationManager authenticationManager;

  @Autowired private JwtUtils jwtUtils;
  @Autowired private ModelMapper modelMapper;

  @Override
  public AuthenticationResult login(LoginRequest loginRequest) {
    Authentication authentication =
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getUsername(), loginRequest.getPassword()));

    SecurityContextHolder.getContext()
        .setAuthentication(authentication); // sets the authentication in the Current
    // executing thread

    UserDetailsImpl userDetails =
        (UserDetailsImpl) authentication.getPrincipal(); // principal is the 'user'
    ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);
    List<String> roles =
        userDetails.getAuthorities().stream().map(item -> item.getAuthority()).toList();
    UserInfoResponse response =
        new UserInfoResponse(
            userDetails.getId(),
            jwtCookie.getValue(),
            userDetails.getUsername(),
            userDetails.getEmail(),
            roles);

    return new AuthenticationResult(response, jwtCookie);
  }

  @Override
  public ResponseEntity<MessageResponse> register(SignupRequest signupRequest) {
    if (userRepository.existsByUserName(signupRequest.getUsername())) {
      return ResponseEntity.badRequest()
          .body(new MessageResponse("Error : username is already taken !"));
    }

    if (userRepository.existsByEmail(signupRequest.getEmail())) {
      return ResponseEntity.badRequest()
          .body(new MessageResponse("Error : Email is already taken !"));
    }

    User user =
        new User(
            signupRequest.getUsername(),
            encoder.encode(signupRequest.getPassword()),
            signupRequest.getEmail());

    Set<String> strRoles = signupRequest.getRole();
    Set<Role> roles = new HashSet<>();

    if (strRoles == null) {
      Role userRole =
          roleRepository
              .findByRoleName(AppRole.ROLE_USER)
              .orElseThrow(() -> new RuntimeException("Error : Role is not found"));
      roles.add(userRole);
    } else {
      strRoles.forEach(
          role -> {
            switch (role) {
              case "admin":
                Role adminRole =
                    roleRepository
                        .findByRoleName(AppRole.ROLE_ADMIN)
                        .orElseThrow(() -> new RuntimeException("Error : Role is not found"));
                roles.add(adminRole);
                break;
              case "seller":
                Role sellerRole =
                    roleRepository
                        .findByRoleName(AppRole.ROLE_SELLER)
                        .orElseThrow(() -> new RuntimeException("Error : Role is not found"));
                roles.add(sellerRole);
                break;
              default:
                Role userRole =
                    roleRepository
                        .findByRoleName(AppRole.ROLE_USER)
                        .orElseThrow(() -> new RuntimeException("Error : Role is not found"));
                roles.add(userRole);
            }
          });
    }
    user.setRoles(roles);
    userRepository.save(user);
    return ResponseEntity.ok(new MessageResponse("User Registered Successfully"));
  }

  @Override
  public UserInfoResponse getCurrentUserDetails(Authentication authentication) {
    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
    List<String> roles =
        userDetails.getAuthorities().stream().map(item -> item.getAuthority()).toList();
    UserInfoResponse response =
        new UserInfoResponse(userDetails.getId(), userDetails.getUsername(), roles);
    return response;
  }

  @Override
  public ResponseCookie logout() {
    return jwtUtils.getCleanJwtCookie();
  }

  @Override
  public UserResponse getAllSellers(
      Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
    Sort sortByAndOrder =
        sortOrder.equalsIgnoreCase("asc")
            ? Sort.by(sortBy).ascending()
            : Sort.by(sortBy).descending();

    Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
    Page<User> allUsers = userRepository.findByRoleName(AppRole.ROLE_SELLER, pageDetails);
    List<UserDTO> userDTOs =
        allUsers.getContent().stream().map(p -> modelMapper.map(p, UserDTO.class)).toList();

    UserResponse userResponse = new UserResponse();
    userResponse.setContent(userDTOs);
    userResponse.setPageNumber(allUsers.getNumber());
    userResponse.setPageSize(allUsers.getSize());
    userResponse.setTotalPages(allUsers.getTotalPages());
    userResponse.setTotalElements(allUsers.getTotalElements());
    userResponse.setLastPage(allUsers.isLast());

    return userResponse;
  }
}

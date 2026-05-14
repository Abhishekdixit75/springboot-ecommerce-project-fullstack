package com.ecommerce.project.payload;

import com.ecommerce.project.model.Role;
import java.util.HashSet;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
  private Long userId;
  private String username;
  private String email;
  private Set<Role> roles = new HashSet<>();
  private AddressDTO address;
  private CartDTO cart;
}

def ambiguity(N):
    if N == 1:
        return 4
    
    total_positions = 0
    
    for x in range(-N, N + 1):
        for y in range(-N, N + 1):
            manhattan_distance = abs(x) + abs(y)
            if manhattan_distance <= N and (N - manhattan_distance) % 2 == 0:
                total_positions += 1
    
    return total_positions

# Test cases
test_cases = [1, 2, 3, 4, 5]
for n in test_cases:
    result = ambiguity(n)
    print(f"N={{n}}: {{result}}")

# Main execution
if __name__ == "__main__":
    N = int(input("Enter N: "))
    result = ambiguity(N)
    print(result)
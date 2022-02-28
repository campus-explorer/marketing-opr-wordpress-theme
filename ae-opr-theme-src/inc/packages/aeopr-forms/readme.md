# Archer OPR Lead Form
## Version 2.2

### Data Requirements
1. apiKey - Archer Student Hub GraphQL api key
2. ash_midpoint - URL of the Archer Student Hub API
3. programsList - List of program data for Select menu. Format is an nested associative array (aeopr_program_select_list[$campusCode.'--'.$programCode]['value'], aeopr_program_select_list[$campusCode.'--'.$programCode]['campus'], aeopr_program_select_list[$campusCode.'--'.$programCode]['label'])
4. redirect - URL to redirect to after form submission
5. applyredirect - URL to redirect to after Apply Now Short Form submission
6. clientPrefix - Student Hub client Prefix code
7. partnerCode - Student Hub client code
8. campusCode - Student Hub Campus Code
9. clientCTPA - Custom Legal copy for the bottom of the form
10. defaultPhone - Phone number to include at the bottom of the form.